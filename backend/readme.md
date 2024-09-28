Route
    /like
      GET - NO AUTH
        -postId
        -username
      POST
        check(username --> post)
        -postId
        -username (whom posted)
        -token
      DELETE
        -postId
        -username
        -token

    /comment
      /GET - NO AUTH
        -postId
        -username
      POST
        -postId
        -username (whom posted)
        -token
        -comment
      delete
        -postId
        -username
        -token