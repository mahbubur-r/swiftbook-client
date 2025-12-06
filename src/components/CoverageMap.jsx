import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const CoverageMap = () => {
    const position = [50.1109, 8.6821]; // Frankfurt am Main

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Coverage Area</h2>
                    <p className="text-gray-600 dark:text-gray-300">We currently deliver to Frankfurt am Main and surrounding areas.</p>
                </div>

                <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg z-0 relative">
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                SwiftBook Frankfurt Hub <br /> We deliver here!
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default CoverageMap;
