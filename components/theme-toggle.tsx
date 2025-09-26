import { useTheme } from "@/lib/theme-context";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark";

    return (
        <TouchableOpacity
            className={`items-center justify-center rounded-full p-2 ${className}`}
            onPress={() => setTheme(isDarkMode ? "light" : "dark")}
            accessibilityLabel="Toggle between light and dark mode"
            accessibilityRole="button"
        >
            {isDarkMode ? (
                <Feather name="sun" size={20} color="#fff" />
            ) : (
                <Feather name="moon" size={20} color="#1f2937" />
            )}
        </TouchableOpacity>
    );
}
