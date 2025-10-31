import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import debounce from '../utils/debouce';
// import { newsData } from '../data/news';
const newsContext = createContext();

export function NewsContextProvider({ children }) {
    const [searchTerm, setSearch] = useState('');
    const [news, setNews] = useState([]);
    // const [searchResult, setSearchResult] = useState([]);

    const LOCAL_STORAGE_LOGIN_KEY = 'loggedInUser';
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY)) ?? '');
    const LOCAL_STORAGE_FAV_KEY = 'favNews';
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAV_KEY)) ?? []);
    const [page, setPage] = useState(1);
    const [errorMessage, setError] = useState('');
    // const errorHandler = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_FAV_KEY, JSON.stringify(fav));
    }, [fav]);

    //retrieve news
    const retrieveNews = async (page) => {
        if (searchTerm !== '') {
            setLoading(true);
            const apiKey = process.env.REACT_APP_API_KEY;
            let url = 'https://newsapi.org/v2/everything?' +
                'sortBy=publishedAt&' +
                `q=${searchTerm}&` +
                'pageSize=20&' +
                `page=${page}&` +
                'language=en&' +
                `apiKey=${apiKey}`;

            let req = new Request(url);

            const response = await fetch(req);
            if (!response.ok) {
                if (response.status === 429 || response.status === 426) { setError("You've reached maximum search allowed. Please try again later."); }
                else if (response.status === 500) {
                    setError('Server is down. Please try again later.');
                }
                else {
                    setError('Failed to load news. Please try again later');
                }
            } else {
                const data = await response.json();
                // if (!data.articles || !Array.isArray(data.articles)) {
                //     setError('Unexpected response format');
                // }
                if (data.articles.length === 0) {
                    setError('No result found.');
                }
                page === 1 ? setNews(mergeList([], data.articles)) : setNews(mergeList(news, data.articles));
            }
            setLoading(false);
        }
    };

    // //retrieve news
    // const retrieveNews = async (page) => {
    //     setLoading(true);
    //     const data = [{
    //         'source': {
    //             'id': null,
    //             'name': 'Thephoblographer.com'
    //         },
    //         'author': 'Nilofer Khan',
    //         'title': 'The Winners',
    //         'description': 'Wildlife photography is a genre that combines courage, creativity, and technological expertise. This year\'s winners of Wildlife Photographer of the Year, run by the Natural History Museum, London, have been able to achieve this with ease. After receiving a re…',
    //         'url': 'https://www.thephoblographer.com/2025/10/14/the-gear-and-grit-behind-the-2025-wildlife-photographer-of-the-year-winners/',
    //         'urlToImage': 'https://www.thephoblographer.com/wp-content/uploads/2025/10/©-Qingrong-Yang-courtesy-Wildlife-Photographer-of-the-Year.jpg',
    //         'publishedAt': '2025-10-14T22:30:00Z',
    //         'content': 'Wildlife photography is a genre that combines courage, creativity, and technological expertise. This year’s winners of Wildlife Photographer of the Year, run by the Natural History Museum, London, ha… [+19064 chars]'
    //     },
    //     {
    //         'source': {
    //             'id': null,
    //             'name': 'Electronicintifada.net'
    //         },
    //         'author': 'Eli Gerzon',
    //         'title': 'Livestream: Is the genocide over? Inside the Gaza ceasefire deal',
    //         'description': 'Jeremy Scahill gives insight from resistance negotiators and stresses need for ongoing activism. Donya Abu Sitta in Gaza on hopes after genocide. Fighters blowing up a tank inside a new Israeli base.',
    //         'url': 'https://electronicintifada.net/blogs/eli-gerzon/livestream-genocide-over-inside-gaza-ceasefire-deal',
    //         'urlToImage': 'https://electronicintifada.net/sites/default/files/styles/original_800w/public/2025-10/main_image59411_ltjw1r8hbc.jpg?itok=4xnLfwtQ',
    //         'publishedAt': '2025-10-11T10:32:56Z',
    //         'content': 'Eli GerzonThe Electronic Intifada Podcast11 October 2025\r\nThe Palestinian resistance didn’t surrender and didn’t agree to disarmament or demilitarization, said Jeremy Scahill on The Electronic Intifa… [+10873 chars]'
    //     },
    //     {
    //         'source': {
    //             'id': null,
    //             'name': 'Electronicintifada.net'
    //         },
    //         'author': 'Eli Gerzon',
    //         'title': 'Livestream: Is the genocide over? Inside the Gaza ceasefire deal',
    //         'description': 'Jeremy Scahill gives insight from resistance negotiators and stresses need for ongoing activism. Donya Abu Sitta in Gaza on hopes after genocide. Fighters blowing up a tank inside a new Israeli base.',
    //         'url': 'https://electronicintifada.net/blogs/eli-gerzon/livestream-genocide-over-inside-gaza-ceasefire-deal',
    //         'urlToImage': 'https://electronicintifada.net/sites/default/files/styles/original_800w/public/2025-10/main_image59411_ltjw1r8hbc.jpg?itok=4xnLfwtQ',
    //         'publishedAt': '2025-10-11T10:32:56Z',
    //         'content': 'Eli GerzonThe Electronic Intifada Podcast11 October 2025\r\nThe Palestinian resistance didn’t surrender and didn’t agree to disarmament or demilitarization, said Jeremy Scahill on The Electronic Intifa… [+10873 chars]'
    //     },
    //     {
    //         'source': {
    //             'id': null,
    //             'name': 'GlobeNewswire'
    //         },
    //         'author': 'Moomoo',
    //         'title': 'Moomoo Partners With W!se to Launch "Student Stock Showdown" Challenge, Empowering Youth With Financial Literacy',
    //         'description': 'Moomoo announced its collaboration with educational nonprofit W!se to launch the "Student Stock Showdown" challenge. ......',
    //         'url': 'https://www.globenewswire.com/news-release/2025/10/14/3166329/0/en/Moomoo-Partners-With-W-se-to-Launch-Student-Stock-Showdown-Challenge-Empowering-Youth-With-Financial-Literacy.html',
    //         'urlToImage': 'https://ml.globenewswire.com/Resource/Download/7be09d2c-6b2c-4492-89bd-9ba22e7eb636',
    //         'publishedAt': '2025-10-14T13:20:00Z',
    //         'content': 'JERSEY CITY, N.J., Oct. 14, 2025 (GLOBE NEWSWIRE) -- Moomoo, one of the world\'s leading investment and trading platforms, today announced its collaboration with educational nonprofit W!se to launch t… [+6565 chars]'
    //     }];

    //     const data2 = [{
    //         'source': {
    //             'id': null,
    //             'name': 'International Business Times'
    //         },
    //         'author': 'AFP team in Gaza with Anne-Sophie Labadie',
    //         'title': 'Palestinians Return To Devastated Gaza City As Truce Holds',
    //         'description': 'Thousands of displaced Palestinians returned to a devastated Gaza City on Saturday, the second day of a ceasefire between Israel and Hamas, with many stunned by the destruction even as others were relieved to find their homes still standing.',
    //         'url': 'https://www.ibtimes.com/palestinians-return-devastated-gaza-city-truce-holds-3786591',
    //         'urlToImage': 'https://d.ibtimes.com/en/full/4627704/displaced-palestinians-make-their-way-gaza-city-second-day-ceasefire-devastated-territory.jpg',
    //         'publishedAt': '2025-10-11T11:48:23Z',
    //         'content': 'Thousands of displaced Palestinians returned to a devastated Gaza City on Saturday, the second day of a ceasefire between Israel and Hamas, with many stunned by the destruction even as others were re… [+4828 chars]'
    //     }, {
    //         'source': {
    //             'id': null,
    //             'name': 'International Business Times'
    //         },
    //         'author': 'AFP team in Gaza with Anne-Sophie Labadie',
    //         'title': 'Palestinians Return To Devastated Gaza City As Truce Holds',
    //         'description': 'Thousands of displaced Palestinians returned to a devastated Gaza City on Saturday, the second day of a ceasefire between Israel and Hamas, with many stunned by the destruction even as others were relieved to find their homes still standing.',
    //         'url': 'https://www.ibtimes.com/palestinians-return-devastated-gaza-city-truce-holds-3786591',
    //         'urlToImage': 'https://d.ibtimes.com/en/full/4627704/displaced-palestinians-make-their-way-gaza-city-second-day-ceasefire-devastated-territory.jpg',
    //         'publishedAt': '2025-10-11T11:48:23Z',
    //         'content': 'Thousands of displaced Palestinians returned to a devastated Gaza City on Saturday, the second day of a ceasefire between Israel and Hamas, with many stunned by the destruction even as others were re… [+4828 chars]'
    //     },];
    //     page === 1 ? setNews(mergeList([], data)) : setNews(mergeList(news, data2));
    //     // setNews([...new Set([...news, ...newsData])]);
    //     setLoading(false);
    // };

    // //filter to have no duplicate
    // const filterList = (listA) => {
    //     let finalList = [];
    //     listA.forEach(a => {
    //         if(!finalList.some(f =>
    //                 (f.title.trim().toLowerCase() === a.title.trim().toLowerCase()
    //                     && f.urlToImage === a.urlToImage)
    //                 || f.url === a.url
    //             )){
    //                 finalList = [...finalList, a];
    //             }
    //     });
    //     return finalList;
    // };

    // //merge without duplicate based on url, title and image URL
    // const mergeList = (listA, listB) => {
    //     //make sure new list does not have duplicate too
    //     const cleanedList = filterList(listB);
    //     return [
    //         ...listA,
    //         ...cleanedList.filter(c =>
    //             !listA.some(a =>
    //                 (a.title.trim().toLowerCase() === c.title.trim().toLowerCase()
    //                     && a.urlToImage === c.urlToImage)
    //                 || a.url === c.url
    //             )
    //         )
    //     ];
    // };

    //creating key to check for duplication 
    const getArticleKey = (article) => {
        const title = article.title.trim().toLowerCase() ?? '';
        const imageURL = article.urlToImage ?? '';
        const url = article.url ?? '';
        return `${imageURL}::${title}::${url}`;
    };

    //merge list without duplicate
    const mergeList = (listA, listB) => {
        const checked = new Set();
        const filtered = [];

        listA.forEach(a => {
            const key = getArticleKey(a);
            if (!checked.has(key)) {
                checked.add(key);
                filtered.push(a);
            }
        });

        listB.forEach(b => {
            const key = getArticleKey(b);
            if (!checked.has(key)) {
                checked.add(key);
                filtered.push(b);
            }
        });
        return filtered;
    };

    //add news to favourites
    const addNewsToFav = (newFav) => {
        setFav([...fav, newFav]);
    };

    //remove news from favourites
    const removeNewsFromFav = (title) => {
        let newFavList = fav.filter((favNews) => {
            return favNews.title !== title;
        });
        setFav(newFavList);
    };

    // useEffect(() => {
    //     //error handler. When searchTerm changes, wait 300ms before setting error message
    //     errorHandler.current = debounce((value) => {
    //         if (value === '') {
    //             setError('Search something to start.');
    //         }
    //         else if(value !== ''){
    //             setError('Press Enter or click Search Icon once you are done.');
    //         }
    //         else if(errorMessage === 'No result found.'){
    //             setError(errorMessage);
    //         }
    //     }, 300);

    //     //cleanup on unmount
    //     return () => {
    //         errorHandler.current.cancel?.();
    //     };
    // }, []);

    // //make sure search results are consistent when contacts changes and searchTerm is not empty
    // useEffect(() => {
    //     errorHandler.current?.(searchTerm);
    // }, [searchTerm]);

    //values provided by the contactsCRUDcontext.Provider
    const value = {
        user,
        setUser,
        news,
        setNews,
        retrieveNews,
        searchTerm,
        setSearch,
        fav,
        setFav,
        addNewsToFav,
        removeNewsFromFav,
        page,
        setPage,
        loading,
        setLoading,
        errorMessage,
        setError
    };

    return <newsContext.Provider value={value}>
        {children}
    </newsContext.Provider>;
}

export function useNewsContext() {
    return useContext(newsContext);
}
