SELECT *, 'added' AS action
FROM dataset_version AS d_new
WHERE d_new.version = t2
  AND d_new.dataset_code = 'X'
  AND NOT EXISTS (
    SELECT 1
    FROM dataset_version AS d_old
    WHERE d_old.version = t1
      AND d_old.dataset_code = d_new.dataset_code
      AND d_old.user_id = d_new.user_id
  );
