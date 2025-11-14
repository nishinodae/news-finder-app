import { createContext, useContext, useEffect, useState } from 'react';

const newsContext = createContext();

export function NewsContextProvider({ children }) {
    const LOCAL_STORAGE_LOGIN_KEY = 'loggedInUser';
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY)) ?? '');
    const LOCAL_STORAGE_FAV_KEY = 'favNews';
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAV_KEY)) ?? []);
    const [searchTerm, setSearch] = useState('');
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [errorMessage, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_FAV_KEY, JSON.stringify(fav));
    }, [fav]);

    //retrieve news
    const retrieveNews = async (page, searchTerm) => {
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

            try {
                const response = await fetch(req);
                if (!response.ok) {
                    if (response.status === 429 || response.status === 426) {
                        setError("You've reached maximum search allowed. Please try again later.");
                    }
                    else if (response.status === 500) {
                        setError('Server is down. Please try again later.');
                    }
                    else {
                        setError('Failed to load news. Please try again later');
                    }
                } else {
                    const data = await response.json();
                    if (data.articles.length === 0) {
                        setError('No result found.');
                    }
                    page === 1 ? setNews(mergeList([], data.articles)) : setNews(prev => mergeList(prev, data.articles));
                }
            }
            catch (e) {
                setError(`${e.message}. Check your internet connection`);
            }
            setLoading(false);
        }
        else {
            setError('Please search something');
        }
    };

    const getArticleKey = (article) => {
        const title = article.title.trim().toLowerCase() ?? '';
        const imageURL = article.urlToImage ?? '';
        const url = article.url ?? '';
        return `${imageURL}::${title}::${url}`;
    };

    //merge list without duplicate
    const mergeList = (listA, listB) => {
        const existingKeys = new Set(listA.map(getArticleKey));
        const newArticles = [];

        listB.forEach(b => {
            const key = getArticleKey(b);
            if (!existingKeys.has(key)) {
                existingKeys.add(key);
                newArticles.push(b);
            }
        });

        if (newArticles.length === 0) return listA;

        return [...listA, ...newArticles];
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

    const value = {
        user,
        setUser,
        fav,
        setFav,
        searchTerm,
        setSearch,
        news,
        setNews,
        retrieveNews,
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
