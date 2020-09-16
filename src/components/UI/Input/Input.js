import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let input_ele = null;
  const input_classes = [classes.InputElement];

  if (props.invalid && props.should_validate && props.touched) {
    input_classes.push(classes.Invalid);
    console.log(props.should_validate);
  }

  switch (props.elementType) {
    case "input":
      input_ele = (
        <input
          className={input_classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      input_ele = (
        <textarea
          className={input_classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      input_ele = (
        <select
          className={input_classes.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayvalue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      input_ele = (
        <input
          className={input_classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input_ele}
    </div>
  );
};

export default input;
