function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 py-4 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm">
                &copy; {new Date().getFullYear()} - Made with ❤️ by{" "}
                <span className="text-green-400 font-semibold hover:underline">
                    Chae Mendoza
                </span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
