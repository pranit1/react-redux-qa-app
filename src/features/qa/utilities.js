// A mock function to mimic making an async request for data
export const asyncPost = (value) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: value }), 5000)
    );
}

export const sortPosts = (posts) => {
    return posts.sort((a,b) => {
            let questionA = a.question.toLowerCase(),
            questionB = b.question.toLowerCase()
            if (questionA < questionB)
                return -1
            if (questionA > questionB)
                return 1
            return 0
    })
}
  