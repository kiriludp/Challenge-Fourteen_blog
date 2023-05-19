console.log('test')

const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#comment-desc').value.trim();
  
    if (description) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create post');
      }
    }
  };