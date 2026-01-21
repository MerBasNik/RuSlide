import classes from "./ToolBarButton.module.css";
import { type Presentation } from "../../store/types/Presentation/Presentation.ts";

type ToolBarButtonProps = {
    editor?: Presentation;
    src?: string;
    nameAction: string;
    className?: string;
    clickHandle: () => void;
    children?: React.ReactNode;
};

const ToolBarButton = ({ src, children, clickHandle, className }: ToolBarButtonProps) => {
    const onClick = () => {
        clickHandle();
    };

    return (
        <div className={className}>
            {src ? (
                <img onClick={onClick} src={src} alt="" className={classes.toolBarButton} />
            ) : (
                <div onClick={onClick} className={classes.toolBarButton}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default ToolBarButton;
