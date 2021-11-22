import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout(props) {

    const router = useRouter()
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })

        await router.push('/login')
    }

    let menu

    if (!props.auth) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link href="/login">
                        <a className="nav-link active" aria-current="page">Login</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register">
                        <a className="nav-link active" aria-current="page">Register</a>
                    </Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
            </Head>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link href="/">
                        <a className="navbar-brand" href="#">Home</a>
                    </Link>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>

            <main className="form-signin">
                {props.children}
            </main>
        </>
    );
};
