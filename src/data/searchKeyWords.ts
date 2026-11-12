type Keyword={
    searchText: string,
    smoke: boolean
}

type SearchKeyWords ={
    found : Keyword[], 
    notFound: string
}

export const searchKeyWords ={
    found: [
        {
            searchText: "jean",
            smoke: true
        },
        {
            searchText: "top",
            smoke: false
        },
        {
            searchText: "dress",
            smoke: false
        },
        {
            searchText: "tshirt",
            smoke: false
        },
        {
            searchText: "TOP",
            smoke: false
        }
    ],
    notFound: "aokhoa"
} satisfies SearchKeyWords;