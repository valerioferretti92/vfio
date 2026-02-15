SELECT *, 'updated' AS action
FROM dataset_version AS d_new
WHERE d_new.version = t2
  AND d_new.dataset_code = 'X'
  AND EXISTS (
    SELECT 1
    FROM dataset_version AS d_old
    WHERE d_old.version = t1
      AND d_new.dataset_code = d_old.dataset_code
      AND d_new.user_id = d_old.user_id
      AND (
        d_new.name != d_old.name
        OR d_new.surname != d_old.surname
        OR d_new.age != d_old.age
      )
  );
