import React, { useState } from 'react';
import css from './EditedComponent.module.css';

const EditedComponent = ({
                             setChange,
                             field,
                             baseClass,
                             children,
                         }) => {
    const [edited, setEdited] = useState(false);
    const [value, setValue] = useState(children.props.children);
    const setRef = (node) => {
        node && node.focus();
    };
    const onEdit = () => {
        setEdited(true);
    };

    const onChange = (ev) => {
        setValue(ev.target.value);
    };

    const onBlur = () => {
        setEdited(false);
        setChange && setChange(value);
    };
    const Component = field || 'input';
    return (
        <div className={baseClass || null}>
            {edited ? (
                <Component
                    className="label-edit__input"
                    ref={setRef}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            ) : (
                <>
                    {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                            key: index,
                            className: [css.edited_block].concat(child.props.className).join(' '),
                            onClick: onEdit,
                            children: value,
                        })
                    )}
                </>
            )}
        </div>
    );
};

export default EditedComponent;
