// component css styles
import styles from "./FormTextField.module.css";

export default function FormTextField({ name, label, register, errors, ...props }) {
  return (
    <div className={styles["form-text-field"]}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...register(name)} aria-invalid={errors[name] ? "true" : "false"} {...props} />
      {errors[name] && <p role="alert">{errors[name].message}</p>}
    </div>
  );
}
