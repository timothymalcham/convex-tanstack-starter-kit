import {
    Link,
} from '@tanstack/react-router'

export function LandingPage() {
    return (
        <div>
            <h1>LANDING PAGE</h1>
            <Link to="/sign-in">Sign in</Link>
        </div>
    )
}