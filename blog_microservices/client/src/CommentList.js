
export default ({comments}) => {
  
    const renderedComments = comments.map(comment => {
        let content;
        if(comment.status === 'approved') {
            content = comment.content
        }
        if(comment.status === 'pending') {
            content = 'This Comment is awaiting moderation'
        }
        if(comment.status === 'rejected') {
            content = 'This Comment is rejected'
        }
        return <li key={comment.id}>{content}</li>
    })
    return (
        <ul>
        {renderedComments}
        </ul>
    )
}