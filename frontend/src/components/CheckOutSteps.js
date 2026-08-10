import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckOutSteps({ step1, step2, step3, step4 }) {
    const steps = [
        { label: 'Login', path: '/login', active: step1 },
        { label: 'Shipping', path: '/shipping', active: step2 },
        { label: 'Payment', path: '/payment', active: step3 },
        { label: 'Place Order', path: '/placeorder', active: step4 },
    ]

    const lastActiveIndex = steps.reduce(
        (acc, s, i) => (s.active ? i : acc), -1
    )

    return (
        <div className='checkout-steps-wrap'>
            <Nav className='checkout-steps justify-content-center py-4'>
                {steps.map((s, i) => {
                    const isCurrent = i === lastActiveIndex
                    const isComplete = s.active && i < lastActiveIndex

                    const circle = (
                        <span className={`checkout-steps__circle ${isComplete ? 'is-complete' : s.active ? 'is-active' : 'is-disabled'
                            }`}>
                            {isComplete ? '✓' : i + 1}
                        </span>
                    )

                    const label = (
                        <span className={`checkout-steps__label ${s.active ? (isCurrent ? 'is-current' : 'is-complete') : 'is-disabled'
                            }`}>
                            {s.label}
                        </span>
                    )

                    return (
                        <React.Fragment key={s.label}>
                            <Nav.Item className='checkout-steps__item'>
                                {s.active ? (
                                    <LinkContainer to={s.path}>
                                        <Nav.Link className='checkout-steps__link'>
                                            {circle}
                                            {label}
                                        </Nav.Link>
                                    </LinkContainer>
                                ) : (
                                    <Nav.Link disabled className='checkout-steps__link'>
                                        {circle}
                                        {label}
                                    </Nav.Link>
                                )}
                            </Nav.Item>

                            {i < steps.length - 1 && (
                                <div className={`checkout-steps__connector ${i < lastActiveIndex ? 'is-complete' : ''
                                    }`} />
                            )}
                        </React.Fragment>
                    )
                })}
            </Nav>
        </div>
    )
}

export default CheckOutSteps