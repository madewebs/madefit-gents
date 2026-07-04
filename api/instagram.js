export default async function handler(req, res) {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        return res.status(500).json({ error: "INSTAGRAM_ACCESS_TOKEN is not configured in Vercel Environment Variables." });
    }

    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${token}`);
        
        if (!response.ok) {
            const errData = await response.json();
            return res.status(response.status).json({ error: errData.error?.message || "Instagram API error" });
        }

        const data = await response.json();
        
        // Add CORS headers for local development access
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
