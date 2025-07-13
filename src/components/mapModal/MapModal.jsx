import { useState, useEffect, useRef } from 'react'
import './MapModal.scss'

const MapModal = ({ isOpen, onClose, pickupLocation, deliveryLocation, driverLocation = null }) => {
    const mapRef = useRef(null)
    const [map, setMap] = useState(null)
    const [directionsService, setDirectionsService] = useState(null)
    const [directionsRenderer, setDirectionsRenderer] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [mapError, setMapError] = useState(null)

    // Load Google Maps API
    useEffect(() => {
        if (!window.google && !window.googleMapsLoading) {
            window.googleMapsLoading = true
            const script = document.createElement('script')
            // For testing without API key, we'll create a fallback
            // Replace YOUR_ACTUAL_API_KEY with your real Google Maps API key
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places`
            script.async = true
            script.defer = true
            script.onload = () => {
                window.googleMapsLoading = false
                initializeMap()
            }
            script.onerror = () => {
                setMapError('Failed to load Google Maps')
                setIsLoading(false)
            }
            document.head.appendChild(script)
        } else if (window.google && isOpen) {
            initializeMap()
        }
    }, [isOpen])

    const initializeMap = () => {
        if (!window.google || !mapRef.current || !isOpen) return

        try {
            // Create map centered between pickup and delivery
            const centerLat = (pickupLocation.coordinates.lat + deliveryLocation.coordinates.lat) / 2
            const centerLng = (pickupLocation.coordinates.lng + deliveryLocation.coordinates.lng) / 2

            const mapInstance = new window.google.maps.Map(mapRef.current, {
                zoom: 12,
                center: { lat: centerLat, lng: centerLng },
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            })

            const directionsServiceInstance = new window.google.maps.DirectionsService()
            const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#4267B2',
                    strokeWeight: 4,
                    strokeOpacity: 0.8
                }
            })

            directionsRendererInstance.setMap(mapInstance)

            setMap(mapInstance)
            setDirectionsService(directionsServiceInstance)
            setDirectionsRenderer(directionsRendererInstance)

            // Add custom markers
            addCustomMarkers(mapInstance)

            // Calculate and display route
            calculateRoute(directionsServiceInstance, directionsRendererInstance)

            setIsLoading(false)
        } catch (error) {
            console.error('Error initializing map:', error)
            setMapError('Failed to initialize map')
            setIsLoading(false)
        }
    }

    const addCustomMarkers = (mapInstance) => {
        // Pickup marker
        new window.google.maps.Marker({
            position: pickupLocation.coordinates,
            map: mapInstance,
            title: 'Pickup Location',
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#4267B2',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            label: {
                text: 'P',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
            }
        })

        // Delivery marker
        new window.google.maps.Marker({
            position: deliveryLocation.coordinates,
            map: mapInstance,
            title: 'Delivery Location',
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#10b981',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            label: {
                text: 'D',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
            }
        })

        // Driver marker (if provided)
        if (driverLocation) {
            new window.google.maps.Marker({
                position: driverLocation,
                map: mapInstance,
                title: 'Your Location',
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#f59e0b',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2
                },
                animation: window.google.maps.Animation.BOUNCE
            })
        }
    }

    const calculateRoute = (directionsServiceInstance, directionsRendererInstance) => {
        const request = {
            origin: pickupLocation.coordinates,
            destination: deliveryLocation.coordinates,
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }

        directionsServiceInstance.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRendererInstance.setDirections(result)
            } else {
                console.error('Directions request failed:', status)
            }
        })
    }

    const openInGoogleMaps = () => {
        const pickup = `${pickupLocation.coordinates.lat},${pickupLocation.coordinates.lng}`
        const delivery = `${deliveryLocation.coordinates.lat},${deliveryLocation.coordinates.lng}`
        const url = `https://www.google.com/maps/dir/${pickup}/${delivery}`
        window.open(url, '_blank')
    }

    const openInAppleMaps = () => {
        const pickup = `${pickupLocation.coordinates.lat},${pickupLocation.coordinates.lng}`
        const delivery = `${deliveryLocation.coordinates.lat},${deliveryLocation.coordinates.lng}`
        const url = `http://maps.apple.com/?saddr=${pickup}&daddr=${delivery}&dirflg=d`
        window.open(url, '_blank')
    }

    if (!isOpen) return null

    return (
        <div className="map-modal-overlay" onClick={onClose}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
                <div className="map-header">
                    <div className="map-title">
                        <h3>Route to Delivery</h3>
                        <p>Navigate from pickup to delivery location</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="map-content">
                    {isLoading && (
                        <div className="map-loading">
                            <div className="loading-spinner"></div>
                            <p>Loading map...</p>
                        </div>
                    )}

                    {mapError && (
                        <div className="map-error">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <h4>Map Unavailable</h4>
                            <p>{mapError}</p>
                            <div className="external-nav-buttons">
                                <button className="external-nav-btn google" onClick={openInGoogleMaps}>
                                    Open in Google Maps
                                </button>
                                <button className="external-nav-btn apple" onClick={openInAppleMaps}>
                                    Open in Apple Maps
                                </button>
                            </div>
                        </div>
                    )}

                    <div
                        ref={mapRef}
                        className="map-container"
                        style={{ display: isLoading || mapError ? 'none' : 'block' }}
                    />
                </div>

                {!isLoading && !mapError && (
                    <div className="map-footer">
                        <div className="route-info">
                            <div className="location-points">
                                <div className="location-point pickup">
                                    <div className="point-marker pickup"></div>
                                    <div className="point-details">
                                        <span className="point-label">Pickup</span>
                                        <span className="point-address">{pickupLocation.street}</span>
                                    </div>
                                </div>
                                <div className="route-arrow">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <div className="location-point delivery">
                                    <div className="point-marker delivery"></div>
                                    <div className="point-details">
                                        <span className="point-label">Delivery</span>
                                        <span className="point-address">{deliveryLocation.street}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="map-actions">
                            <button className="external-nav-btn google" onClick={openInGoogleMaps}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 6.56 8.5 15.5 8.5 15.5s8.5-8.94 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                </svg>
                                Google Maps
                            </button>
                            <button className="external-nav-btn apple" onClick={openInAppleMaps}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.85 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                </svg>
                                Apple Maps
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MapModal