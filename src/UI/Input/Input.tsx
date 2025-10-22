import classes from "./Input.module.css";
import type { ChangeEvent } from "react";

type InputProps = {
    presentationName: string;
    onNameChange: (newName: string) => void;
};

const Input = ({ presentationName, onNameChange }: InputProps) => {
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        console.log(name);
        onNameChange(name);
    };
    return (
        <div className={classes.inputWidget}>
            <div className={classes.inputLabel}>
                <span className={classes.inputLabelInner}></span>
            </div>
            <div className={classes.inputWrapper}>
                <input
                    className={classes.input}
                    value={presentationName}
                    onChange={handleNameChange}
                />
            </div>
        </div>
    );
};

export default Input;
