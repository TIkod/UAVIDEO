
interface IComment {
    _id: string,
    text: string,
    author: { id: string, name: string, email: string },
    video: string
}