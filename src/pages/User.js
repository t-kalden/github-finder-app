import { useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { FaCodepen, FaStore, FaUserFriends, FaUsers, FaGithub } from 'react-icons/fa'
import { getUser, getUserRepos} from "../context/github/GithubActions"

import Spinner from "../components/layout/Spinner"
import GithubContext from "../context/github/GithubContext"
import RepoList from "../components/repos/RepoList"

function User() {
    const { user, loading, repos, dispatch } = useContext(GithubContext)
    
    const params = useParams()

    const {
        name, type, avatar_url,
        location, bio, blog,
        twitter_username, 
        login, html_url,
        followers, following,
        public_repos, public_gists,
        hireable
    } = user


    useEffect(() => {
        dispatch({type: 'SET_LOADING'})
        const getUserData = async() => {
            const userData = await getUser(params.login)
            dispatch({type: 'GET_USER', payload: userData})

            const userRepoData = await getUserRepos(params.login)
            dispatch({type: 'GET_REPOS', payload: userRepoData})
        }
        getUserData()
    }, [])

    if(loading) {
        return <Spinner />
    }

  return (
    <>
        {/* main container  */}
        <div className="w-full mx-auto lg:w-10/12">

            {/* back to search button  */}
            <div className="mb-4">
                <Link to='/' className="btn btn-ghost">Back To Search</Link>
            </div>
            {/* card image */}
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 
                            md:grid-cols-3 mb-8 md:gap-8">
                <div className="custom-card-image mb-6 md:mb-0">
                    <div className="rounded-lg shadow-xl card image-full">
                        <figure>
                            <img src={avatar_url} alt="Profile"  />
                        </figure>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mb-6">
                        <h1 className="text-3xl card-title mb-1">
                            {name} 
                            <div className="ml-2 mr-1 badge badge-success">{type}</div>
                            {hireable && (
                                <div className="mx-1 badge badge-info">Hireable</div>
                            )}
                        </h1>
                        <p className="text-2xl">{login}</p>
                        <p>{bio}</p>
                        <div className="mt-4 card-actions">
                            <a href={html_url} target="_blank" rel="noreferrer" className="btn btn-outline">
                                <FaGithub className="text-xl md:text-2xl  mr-2"/> Visit Github Profile
                            </a>
                        </div>
                    </div>

                    <div className="w-full rounded-lg shadow md bg-base-100 stats">
                        {location && (
                            <div className="stat">
                                <div className="stat-title text-md">Location</div>
                                <div className="text-lg stat-value">{location}</div>
                            </div>
                        )}
                        {blog && (
                            <div className="stat">
                                <div className="stat-title text-md">Website</div>
                                <div className="text-lg stat-value">
                                    <a href={`http://${blog}`} target="_blank" rel="noreferrer">{blog}</a>
                                </div>
                            </div>
                        )}
                        {twitter_username && (
                            <div className="stat">
                                <div className="stat-title text-md">Twitter</div>
                                <div className="text-lg stat-value">
                                    <a href={`http://twitter.com/${twitter_username}`} target="_blank" rel="noreferrer">{twitter_username}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl md:text-5xl" />
                    </div>
                    <div className="stat-title pr-5">Follower</div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {followers}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUserFriends className="text-3xl md:text-5xl" />
                    </div>
                    <div className="stat-title pr-5">Following</div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {following}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCodepen className="text-3xl md:text-5xl" />
                    </div>
                    <div className="stat-title pr-5">Public Repos</div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {public_repos}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaStore className="text-3xl md:text-5xl" />
                    </div>
                    <div className="stat-title pr-5">Public Gists</div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {public_gists}
                    </div>
                </div>
            </div>

            {/* repo list */}
            <RepoList repos={repos} />
        </div>
    </>
  )
}

export default User