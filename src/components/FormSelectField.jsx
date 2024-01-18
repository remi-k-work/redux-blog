// component css styles
import styles from "./FormSelectField.module.css";

// other libraries
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function FormSelectField({ name, label, register, errors, children, ...props }) {
  return (
    <div className={styles["form-select-field"]}>
      <label htmlFor={name}>{label}</label>
      <select id={name} {...register(name)} aria-invalid={errors[name] ? "true" : "false"} {...props}>
        {children}
      </select>
      {errors[name] && (
        <p role="alert">
          <ExclamationTriangleIcon width={24} height={24} />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
