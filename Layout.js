import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home, Calendar, BookOpen, Settings, GanttChartSquare } from 'lucide-react';
import BottomNavBar from "./components/layout/BottomNavBar";
import "leaflet/dist/leaflet.css";

const navigationItems = [
  { href: "Today", label: "Today", icon: Home },
  { href: "Timetable", label: "Timetable", icon: GanttChartSquare },
  { href: "Calendar", label: "Calendar", icon: Calendar },
  { href: "Subjects", label: "Subjects", icon: BookOpen },
];

export default function Layout({ children, currentPageName }) {
  const [theme, setTheme] = useState("dark");
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const showBottomNav = navigationItems.some(item => location.pathname.includes(item.href) || location.pathname === '/');

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100 font-sans">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pb-20">
          {children}
        </div>
      </main>
      {showBottomNav && <BottomNavBar items={navigationItems} />}
    </div>
  );
}
