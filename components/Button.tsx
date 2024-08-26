export const Button = ({ onClick, children, variant = 'primary', size = 'medium', type = 'button', className = '' }: {
    onClick: () => void,
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'outline',
    size?: 'small' | 'medium' | 'large',
    type?: 'button' | 'submit' | 'reset',
    className?: string
}) => {
    let buttonClasses = '';

    switch (variant) {
        case 'primary':
            buttonClasses = 'bg-green-500 hover:bg-green-600 text-white';
            break;
        case 'secondary':
            buttonClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
            break;
        case 'outline':
            buttonClasses = 'border border-green-500 hover:bg-green-500 hover:text-white text-green-500';
            break;
    }

    switch (size) {
        case 'small':
            buttonClasses += ' px-4 py-2 text-sm';
            break;
        case 'medium':
            buttonClasses += ' px-6 py-3 text-base';
            break;
        case 'large':
            buttonClasses += ' px-8 py-4 text-lg';
            break;
    }

    return (
        <button
            onClick={onClick}
            type={type} // Forward the type prop
            className={`font-medium rounded-md transition duration-200 ${buttonClasses}`}
        >
            {children}
        </button>
    );
};