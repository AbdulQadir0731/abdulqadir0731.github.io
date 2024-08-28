document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Document loaded, starting API fetch...');
        const apiUrl = 'https://api-v1.vooconnect.com:9451/api/v1/get-post-by-id';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE4YTZjNmUtMTRmOS00YTc1LWFkMTQtNTBiZjIxNGQ4ZWI5IiwiaWF0IjoxNzI0ODExNjA4LCJleHAiOjE3Mjc0MDM2MDh9.6_PUp_uoYYJRP6jAju3xorzxcaHkw6Fbeza2-2ZNMtU';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: 548 })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API response:', data);

        if (data.status && data.posts.length > 0) {
            const post = data.posts[0];
            const baseUrl = 'https://api-v1.vooconnect.com:9452/uploads';

            if (post.title) {
                document.title = post.title;
            }

            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = post.description || '';

            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = post.title || '';

            let ogImage = document.querySelector('meta[property="og:image"]');
            if (!ogImage) {
                ogImage = document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                document.head.appendChild(ogImage);
            }
            ogImage.content = baseUrl + post.thumbnail_url;

            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
                ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                document.head.appendChild(ogTitle);
            }
            ogTitle.content = post.title || '';

            let ogDescription = document.querySelector('meta[property="og:description"]');
            if (!ogDescription) {
                ogDescription = document.createElement('meta');
                ogDescription.setAttribute('property', 'og:description');
                document.head.appendChild(ogDescription);
            }
            ogDescription.content = post.description || '';

            console.log('Meta tags updated.');
        } else {
            console.error('No posts found or status is not true');
        }

    } catch (error) {
        console.error('Error fetching meta data:', error);
    }
});
