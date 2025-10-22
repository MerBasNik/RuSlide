export type OptionsType = {
    value: string;
    label: string;
};

type DropdownProps = {
    title: string;
    onClose?: () => void;
    onOpen?: () => void;
    options: OptionsType[];
    onActionSelected?: (optionId: string) => void;
};

const Dropdown = ({ title, options }: DropdownProps) => {
    let isOpen = false;
    const handleClick = (option: OptionsType) => {
        console.log(option);
        // onClose();
    };
    const handleMouseEnter = () => {
        isOpen = true;
        // onOpen();
    };
    const handleMouseLeave = () => {
        isOpen = false;
        // onClose();
    };

    return (
        <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
            <button>{title}</button>
            {!isOpen && (
                <div>
                    {options.map((option: OptionsType) => (
                        <div key={option.value} onClick={() => handleClick(option)}>
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
