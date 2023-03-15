import React from "react";
import { Spinner } from "@alfalab/core-components/spinner";

import styles from "./loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <Spinner visible={true} size="m" />
    </div>
  );
};
