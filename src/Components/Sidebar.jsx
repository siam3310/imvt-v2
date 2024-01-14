import { MoreVertical, ChevronLast, ChevronFirst, HomeIcon, Flame, Tv, Search, Clapperboard, Film, PanelRightClose, PanelLeftClose, ArrowLeftFromLine, XCircle } from "lucide-react"
import { useContext, createContext, useState } from "react"
import Logo from "./logo.svg";
const SidebarContext = createContext()
import { Link } from "react-router-dom";
export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(false)
    const [hideSidebar, setHideSidebar] = useState(false)

    return (
        <aside className={`h-[100dvh]`}>
            {hideSidebar && <button
                onClick={() => { setHideSidebar((curr) => !curr); setExpanded(false) }}
                className={`absolute top-4 left-4 z-10 clickable p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100`}>
                <PanelRightClose />
            </button>}
            <nav className={`h-[100dvh] z-100 flex flex-col shadow-sm bg-[#0b0b0b] ${expanded && "absolute z-[100000] top-0 left-0 bg-[#0b0b0b]"} ${hideSidebar ? "absolute z-10 top-0 right-[100vw] bg-[#151517]" : "lg:static "}`}>
                <div className={`p-4 flex justify-between items-center`}>
                    <Link to={`/`}>
                        <img
                            src={Logo}
                            className={`clickable transition-all rounded-lg bg-gray-50 hover:bg-gray-100 object-cover aspect-[1.5/1] ${expanded ? "w-28" : "w-0"
                                }`}
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex gap-x-3">
                        {expanded && <button onClick={() => setExpanded(false)} className={`clickable p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100`}>
                            <PanelLeftClose />
                        </button>}
                        <button
                            onClick={() => {
                                if (expanded) { setHideSidebar(true); setExpanded(false) }
                                else setExpanded(true)
                            }}
                            className={`clickable p-1 rounded-lg bg-gray-50 hover:bg-gray-100`}
                        >
                            {expanded ? <XCircle /> : <img
                                src={Logo}
                                className={`overflow-hidden transition-all w-8 h-8 object-cover`}
                                alt=""
                            />}
                        </button>
                    </div>

                </div>


                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 flex flex-col justify-center">

                        <SidebarItem link="/" text="Home" icon={<HomeIcon />} />
                        <SidebarItem link="/iptv" text="Live TV" icon={<Tv />} />
                        {/* <SidebarItem link="/trending" text="Trending" icon={<Flame />} /> */}
                        <SidebarItem link="/search" text="Search" icon={<Search />} />
                        <SidebarItem link="/movies" text="Movies" icon={<Clapperboard />} />
                        <SidebarItem link="/tv" text="Series" icon={<Film />} />
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md clickable"
                    />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-white clickable">Vishwajeet Yadav</h4>
                            <span className="text-xs text-white clickable">vishwajeety14122@gmail.com</span>
                        </div>
                        <MoreVertical size={20} color="white" className="clickable" />
                    </div>
                </div>
            </nav>
        </aside >
    )
}

export function SidebarItem({ icon, text, active, alert, link }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <Link to={link}
            className={`z-[2]
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors clickable group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? "w-56 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 whitespace-nowrap py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    {text}
                </div>
            )}
        </Link>
    )
}
