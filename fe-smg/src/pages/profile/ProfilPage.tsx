import { useEffect, useState } from "react";
import { User } from "lucide-react";
import api from "../../lib/axios";

interface Profile {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/users/profile");
            setProfile(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!profile) {
        return <h1>Profile tidak ditemukan</h1>;
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow p-8">
                <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center"><User size={55} /></div>
                <h1 className="text-3xl font-bold mt-5">{profile.name}</h1>
                <p className="text-gray-500">{profile.email}</p>
                <span className="mt-3 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">{profile.role}</span>

                </div>
                    <div className="mt-10 space-y-6">
                    <div>
                        <p className="text-gray-500">Name</p>
                        <h2 className="text-xl font-semibold">{profile.name}</h2>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <h2 className="text-xl font-semibold">{profile.email}</h2>
                    </div>

                    <div>
                        <p className="text-gray-500">Role</p>
                        <h2 className="text-xl font-semibold">{profile.role}</h2>
                    </div>

                    <div>
                        <p className="text-gray-500">Bergabung</p>
                        <h2 className="text-xl font-semibold">{new Date(profile.createdAt).toLocaleDateString("id-ID")}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;