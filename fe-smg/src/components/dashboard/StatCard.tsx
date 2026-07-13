import { Package, Layers, Users, Archive, BarChart3 } from "lucide-react";

interface Props {
    title: string;
    value: number;
}

function StatCard({ title, value }: Props) {
    const getCardDetails = (titleStr: string) => {
        const normalized = titleStr.toLowerCase();
        if (normalized.includes("product")) {
        return {
            icon: <Package size={16} />,
            iconColor: "text-zinc-400 bg-zinc-800"
        };
        }
        if (normalized.includes("category")) {
        return {
            icon: <Layers size={16} />,
            iconColor: "text-zinc-400 bg-zinc-800"
        };
        }
        if (normalized.includes("user")) {
        return {
            icon: <Users size={16} />,
            iconColor: "text-zinc-400 bg-zinc-800"
        };
        }
        if (normalized.includes("stock")) {
        return {
            icon: <Archive size={16} />,
            iconColor: "text-yellow-500 bg-yellow-500/10"
        };
        }
        return {
        icon: <BarChart3 size={16} />,
        iconColor: "text-zinc-400 bg-zinc-800"
        };
    };

    const details = getCardDetails(title);

    return (
        <div className="bg-white-950 rounded-2xl p-6 border border-zinc-800 shadow-xl transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5 flex flex-col justify-between h-32 w-full">
        <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-mono uppercase tracking-widest text-black-400">
            {title}
            </p>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${details.iconColor}`}>
            {details.icon}
            </div>
        </div>

        <div className="flex items-baseline justify-between mt-auto">
            <h2 className="text-3xl font-bold tracking-tight text-black">
            {value.toLocaleString("id-ID")}
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-yellow-500 transition-colors" />
        </div>
        </div>
    );
}

export default StatCard;