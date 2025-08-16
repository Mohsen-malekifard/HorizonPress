import React, { useState, useEffect } from 'react';

// Hardcoded articles data to be mapped over in the JSX
const articles = [
    {
        author: 'سارا احمدی',
        date: '۲۴ اردیبهشت',
        title: 'هنر سکوت در دنیای پرهیاهو',
        summary: 'در عصری که اطلاعات مانند سیلابی بی‌وقفه در جریان است، چگونه می‌توان لحظاتی از آرامش و سکوت واقعی را یافت؟ این مقاله به بررسی تأثیرات عمیق سکوت بر ذهن و روح می‌پردازد.',
    },
    {
        author: 'علی رضایی',
        date: '۱۷ اردیبهشت',
        title: 'سفر به ناشناخته‌ها: نقش کنجکاوی در کشف',
        summary: 'کنجکاوی، نیروی محرک پشت تمام اکتشافات بشری است. از ستاره‌شناسی تا اعماق اقیانوس‌ها، این مقاله کنجکاوی را به عنوان کلیدی برای باز کردن درهای دانش بررسی می‌کند.',
    },
    {
        author: 'لیلا کریمی',
        date: '۱۰ اردیبهشت',
        title: 'معماری مینیمال و تأثیر آن بر زندگی',
        summary: 'چگونه فضاهای خالی و ساده می‌توانند آرامش را به زندگی ما دعوت کنند؟ این مقاله نگاهی به فلسفه پشت معماری مینیمال و چگونگی کاهش استرس روزمره دارد.',
    },
    {
        author: 'رضا یوسفی',
        date: '۳ اردیبهشت',
        title: 'آینده هوش مصنوعی: فراتر از تخیل',
        summary: 'هوش مصنوعی با سرعتی باورنکردنی در حال تغییر جهان ماست. این مقاله به بررسی مرزهای فعلی و چشم‌انداز آینده هوش مصنوعی و تأثیرات آن بر جامعه می‌پردازد.',
    },
];

// This is the main App component for your Next.js application
export default function App() {
    // State to manage the theme (light/dark)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // useEffect hook to handle side effects like local storage and DOM manipulation
    useEffect(() => {
        // Function to check and set the theme on initial load
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

        // Intersection Observer for the fade-in animation
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            });
        }, {
            threshold: 0.1
        });

        // Add initial classes for animation and observe each card
        document.querySelectorAll('.glass-card').forEach(card => {
            card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
            observer.observe(card);
        });

        // Cleanup function for the Intersection Observer
        return () => observer.disconnect();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Function to toggle the theme
    const handleThemeToggle = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        // The main container with Tailwind CSS classes for RTL and theme support
        <div dir="rtl" className={`bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500`}>

            {/* Note: In a real Next.js project, you would move the custom CSS below
                to a global stylesheet file like `globals.css` to avoid inline styling. */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
                
                body {
                    font-family: 'Vazirmatn', sans-serif;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .dark .glass-card {
                    background: rgba(26, 32, 44, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
                }

                .glass-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px 0 rgba(31, 38, 135, 0.5);
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background-color: #9ca3af;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-track {
                    background-color: #e5e7eb;
                }

                .dark ::-webkit-scrollbar-thumb {
                    background-color: #4a5568;
                }
                
                .dark ::-webkit-scrollbar-track {
                    background-color: #2d3748;
                }
            `}</style>
            
            {/* Header Component */}
            <header className="p-6 md:p-10 flex justify-between items-center z-10 sticky top-0 bg-transparent">
                <div className="text-xl md:text-2xl font-bold transition-colors duration-300">
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-400">افق</a>
                </div>
                <nav className="flex items-center space-x-4 space-x-reverse">
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-400 text-sm md:text-base transition-colors duration-300">خانه</a>
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-400 text-sm md:text-base transition-colors duration-300">درباره ما</a>
                    <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none">
                        {isDarkMode ? (
                            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.184a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.59-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM18.894 17.816a.75.75 0 001.06-1.06l-1.59-1.59a.75.75 0 00-1.06 1.06l1.59 1.59zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.06 17.816a.75.75 0 001.06 1.06l1.59-1.59a.75.75 0 00-1.06-1.06L5.06 17.816zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM5.06 6.184a.75.75 0 00-1.06 1.06l1.59 1.59a.75.75 0 001.06-1.06L5.06 6.184z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                <path d="M9.529 1.25a.75.75 0 01.708.869c.145.72.72 1.295 1.44 1.44a.75.75 0 01.87.708A9.006 9.006 0 018.066 17.61a.75.75 0 01-.77-1.391A7.502 7.502 0 0014.25 10.5a7.5 7.5 0 00-6.732-7.444A.75.75 0 018.25 2.25z" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 md:p-8">
                {/* Hero Section */}
                <section className="mb-16 md:mb-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white transition-colors duration-300 mb-4">
                        کلماتی که جهان را می‌سازند
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        اینجا، ایده‌ها زندگی می‌کنند.
                    </p>
                </section>

                {/* Articles Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div key={index} className="glass-card p-6 md:p-8 rounded-3xl cursor-pointer hover:shadow-xl transition-all duration-300">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                <span className="mr-2">نویسنده: {article.author}</span>
                                <span>تاریخ: {article.date}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                                <a href="#">{article.title}</a>
                            </h2>
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                                {article.summary}
                            </p>
                        </div>
                    ))}
                </section>
            </main>

            {/* Footer Component */}
            <footer className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-16 pb-8 transition-colors duration-300">
                &copy; 2025 افق. تمامی حقوق محفوظ است.
            </footer>
        </div>
    );
}
