document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Define the API endpoint and token
        const apiUrl = 'https://api-v1.vooconnect.com:9451/api/v1/get-post-by-id';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE4YTZjNmUtMTRmOS00YTc1LWFkMTQtNTBiZjIxNGQ4ZWI5IiwiaWF0IjoxNzI0ODExNjA4LCJleHAiOjE3Mjc0MDM2MDh9.6_PUp_uoYYJRP6jAju3xorzxcaHkw6Fbeza2-2ZNMtU';

        // Fetch data from the API with POST method
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: 548 })
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if data status is true and there are posts
        if (data.status && data.posts.length > 0) {
            const post = data.posts[0];
            const baseUrl = 'https://api-v1.vooconnect.com:9452/uploads';
            
            // Set the title of the document
            if (post.title) {
                document.title = post.title;
            }
            
            // Set meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = post.description || '';

            // Set meta keywords
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = post.title || '';

            // Set Open Graph meta tags for image
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

            // Set Twitter Card meta tags for image
            let twitterImage = document.querySelector('meta[name="twitter:image"]');
            if (!twitterImage) {
                twitterImage = document.createElement('meta');
                twitterImage.name = 'twitter:image';
                document.head.appendChild(twitterImage);
            }
            twitterImage.content = baseUrl + post.thumbnail_url;

            let twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (!twitterTitle) {
                twitterTitle = document.createElement('meta');
                twitterTitle.name = 'twitter:title';
                document.head.appendChild(twitterTitle);
            }
            twitterTitle.content = post.title || '';

            let twitterDescription = document.querySelector('meta[name="twitter:description"]');
            if (!twitterDescription) {
                twitterDescription = document.createElement('meta');
                twitterDescription.name = 'twitter:description';
                document.head.appendChild(twitterDescription);
            }
            twitterDescription.content = post.description || '';

            console.log('Post data:', post);
        } else {
            console.error('No posts found or status is not true');
        }

    } catch (error) {
        console.error('Error fetching meta data:', error);
    }
});
