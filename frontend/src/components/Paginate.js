import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    const navigate = useNavigate()

    if (keyword) {
        keyword = keyword.split('?keyword=')[1]?.split('&')[0] || ''
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item
                        key={x + 1}
                        active={x + 1 === Number(page)}
                        onClick={() =>
                            navigate({
                                pathname: !isAdmin ? '/' : '/admin/productlist',
                                search: `?keyword=${encodeURIComponent(keyword)}&page=${x + 1}`
                            })
                        }
                    >
                        {x + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate