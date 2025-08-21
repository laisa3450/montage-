import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { FiMail, FiLock, FiUser } from "react-icons/fi"

export default function AuthScreen() {
  const [mode, setMode] = useState<"login"|"signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async () => {
    setError("")
    setShake(false)
    setLoading(true)
    try {
      if (mode === "signup") {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        await supabase.from("profiles").insert({ id: signUpData.user?.id, username })
      } else {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
      }
      navigate("/feed")
    } catch (err: any) {
      setError(err.message || "Invalid credentials")
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className={clsx(
        "bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 space-y-6 transition-transform",
        shake && "animate-shake"
      )}>
        <h1 className="text-3xl font-extrabold text-center">{mode === "login" ? "Log In" : "Sign Up"}</h1>

        <div className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400"/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400"/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          {mode === "signup" && (
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400"/>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e=>setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
              />
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <button
          onClick={handleAuth}
          disabled={loading}
          className={clsx(
            "w-full py-3 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-pink-500 to-purple-500",
            "hover:from-pink-600 hover:to-purple-600 transition",
            loading && "opacity-50"
          )}
        >
          {loading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
        </button>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <button
            className="underline"
            onClick={async () => {
              if (!email) return setError("Enter your email first")
              const { error } = await supabase.auth.resetPasswordForEmail(email)
              if (error) setError(error.message)
              else alert("Check your email for password reset link")
            }}
          >
            Forgot password?
          </button>

          <button
            className="font-semibold text-pink-500 underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  )
}
