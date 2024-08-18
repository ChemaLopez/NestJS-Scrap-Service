


export type SiteMap={
    urlset:UrlSetSiteMap,
    sitemapindex:SiteMapIndex
}

export type SiteMapIndex ={
    sitemap:UrlSiteMap[]
}
export type UrlSetSiteMap={
    url:UrlSiteMap[] | UrlSiteMap
}

export type UrlSiteMap={
    loc:string,
    lastmod:string}