SELECT
  t.id         AS thread_id,
  t.title      AS thread_title,
  t.createdAt  AS thread_created_at,

  u.id         AS author_id,
  u.name       AS author_name,
  u.email      AS author_email,

  p.id         AS post_id,
  p.content    AS post_content,
  p.createdAt  AS post_created_at
FROM `thread` AS t
JOIN `user`   AS u ON u.id = t.authorId
LEFT JOIN `post`  AS p ON p.threadId = t.id
WHERE t.authorId = ?           -- userId
ORDER BY t.createdAt DESC,     -- sortierung
         p.createdAt ASC;      -- sortierung
