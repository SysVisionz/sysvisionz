import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				allow: ["/", "/services"],
				disallow: ["/proposal", "/proposals"],
				userAgent: '*'
			},
		],
		"sitemap": "https://sysvisionz.com/sitemap.xml"
	}
}
