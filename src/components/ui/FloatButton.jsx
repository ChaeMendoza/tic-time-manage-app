import PropTypes from 'prop-types';

function FloatButton({ text }) {
    return (
        <button
            className="fixed bottom-4 right-4 z-[9999] bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
        >
            {text}
        </button>
    );
}

FloatButton.propTypes = {
    text: PropTypes.string.isRequired
};

export default FloatButton;