import { useEffect, useState } from "react";
import { User, Shield, Mail, Calendar, IdCard } from "lucide-react";
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
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-y-yellow-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-xs tracking-widest text-zinc-400 uppercase font-mono">Mengenkripsi Data...</p>
            </div>
        );
    }

    if (!profile) {
        return (
        <div className="flex items-center justify-center min-h-[60vh] text-center antialiased">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 max-w-sm text-white">
            <p className="text-sm font-semibold text-zinc-200">Profile tidak ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Gagal mengambil data identitas pengguna dari server.</p>
            </div>
        </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 antialiased selection:bg-yellow-500 selection:text-zinc-950">
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
            
            {/* Top Header Card */}
            <div className="bg-zinc-950 p-8 pt-12 flex flex-col items-center relative border-b border-zinc-800">
            <div className="absolute top-0 inset-x-0 h-20 bg-[linear-gradient(to_right,#262626_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
            
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-yellow-400 text-zinc-950 flex items-center justify-center shadow-xl shadow-yellow-500/10 border-4 border-zinc-950">
                <User size={44} strokeWidth={1.5} />
            </div>

            <h1 className="text-2xl font-bold text-white mt-4 tracking-tight">{profile.name}</h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">{profile.email}</p>
            
            <span className="mt-4 px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] font-mono uppercase tracking-wider text-yellow-400">
                {profile.role}
            </span>
            </div>

            {/* Info Grid Fields */}
            <div className="p-8 space-y-5 bg-white">
            <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl group hover:border-zinc-300 transition-colors">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-white">
                <IdCard size={18} />
                </div>
                <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Full Name</p>
                <h2 className="text-sm font-bold text-zinc-900 mt-0.5">{profile.name}</h2>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl group hover:border-zinc-300 transition-colors">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-white">
                <Mail size={18} />
                </div>
                <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Email Address</p>
                <h2 className="text-sm font-semibold text-zinc-900 mt-0.5 font-mono">{profile.email}</h2>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl group hover:border-zinc-300 transition-colors">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-white">
                <Shield size={18} />
                </div>
                <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Access Authority</p>
                <h2 className="text-sm font-bold text-zinc-900 mt-0.5 capitalize">{profile.role}</h2>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl group hover:border-zinc-300 transition-colors">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-white">
                <Calendar size={18} />
                </div>
                <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Joined Date</p>
                <h2 className="text-sm font-semibold text-zinc-900 mt-0.5 font-mono">
                    {new Date(profile.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                    })}
                </h2>
                </div>
            </div>
            </div>

        </div>
        </div>
    );
}

export default ProfilePage;