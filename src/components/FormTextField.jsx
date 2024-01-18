// component css styles
import styles from "./FormTextField.module.css";

// other libraries
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function FormTextField({ name, label, register, errors, ...props }) {
  return (
    <div className={styles["form-text-field"]}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...register(name)} aria-invalid={errors[name] ? "true" : "false"} {...props} />
      {errors[name] && (
        <p role="alert">
          <ExclamationTriangleIcon width={24} height={24} />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
