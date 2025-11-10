import classes from "./ToolBarButton.module.css";
import { type Presentation } from "../../store/types/Presentation/Presentation.ts";

type ToolBarButtonProps = {
    editor?: Presentation;
    src?: string;
    nameAction: string;
    clickHandle: () => any;
    children?: React.ReactNode;
};

const ToolBarButton = ({ src, children, clickHandle }: ToolBarButtonProps) => {
    const handleClick = () => {
        clickHandle();
    };
    return (
        <div>
            {src ? (
                <img onClick={handleClick} src={src} alt="" className={classes.toolBarButton} />
            ) : (
                <div onClick={handleClick} className={classes.toolBarButton}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default ToolBarButton;
