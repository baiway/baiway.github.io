---
title: "Supplement: delta function manipulation"
subtitle: Proofs of some of the results used in the derivation of the Klimontovich Equation. 
layout: blog-post.njk
date: 2023-05-24
keywords: delta function, proof, mathematics
supplement: true
tags: posts
---

Starting with the time derivative of the three-dimensional delta-function $\delta(\mathbf{x} - \mathbf{x}_i)$,

$$
\begin{align*}
\frac{\partial}{\partial t}\\, \delta(\mathbf{x} - \mathbf{x}_i)
  &= \frac{\partial}{\partial t}\left[\delta(x - x_i) \\, \delta(y - y_i) \\, \delta(z - z_i) \right] \\\\
  &= \frac{\partial}{\partial t}\left[\delta(x - x_i)\right] \delta(y - y_i) \\, \delta(z - z_i) \\\\
  &\quad + \delta(x - x_i) \frac{\partial}{\partial t}\left[\delta(y - y_i)\right] \delta(z - z_i) \\\\
  &\quad + \delta(x - x_i) \\, \delta(y - y_i) \frac{\partial}{\partial t}\left[\delta(z - z_i)\right] \tag{1}
\end{align*}
$$

To evaluate the time derivatives, we'll use the following trick. Let $f$ be a functional of function $W(x, t)$, i.e. $f = f[W(x, t)]$. By the chain rule,

$$
\begin{equation*}
\frac{\partial f}{\partial t} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial t}. \tag{2}
\end{equation*}
$$

If $\partial W/\partial x = 1$, then

$$
\begin{equation*}
\frac{\partial f}{\partial x} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial x} = \frac{\mathrm{d}f}{\mathrm{d}W}. \tag{3}
\end{equation*}
$$

Thus, for $\partial W/\partial x = 1$, we have

$$
\begin{equation*}
\frac{\partial f}{\partial t} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial t} = \frac{\partial f}{\partial x}\frac{\partial W}{\partial t}. \tag{4}
\end{equation*}
$$

Now, returning to the problem at hand, we can identify $\delta \rightarrow f$ and $W \rightarrow x - x_i(t)$. Therefore, the time derivative of the delta-function can be written

$$
\begin{equation*}
\frac{\partial}{\partial t}\\,\delta(x - x_i) 
= \frac{\partial\delta(x - x_i)}{\partial x}\frac{\partial\delta(x - x_i)}{\partial t} 
= \frac{\partial\delta(x - x_i)}{\partial x}\left(-\frac{\mathrm{d} x_i}{\mathrm{d}t}\right). \tag{5}
\end{equation*}
$$

Using the analogous expressions for the time derivatives of the $y$ and $z$ delta-functions, Equation $1$ can be written as

$$
\begin{align*}
\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i)
  &= -\frac{\partial\delta(x - x_i)}{\partial x}\frac{\mathrm{d} x_i}{\mathrm{d}t} \delta(y - y_i) \\, \delta(z - z_i) \\\\
  &\quad - \delta(x - x_i) \frac{\partial\delta(y - y_i)}{\partial y}\frac{\mathrm{d} y_i}{\mathrm{d}t} \delta(z - z_i) \\\\
  &\quad - \delta(x - x_i) \\, \delta(y - y_i) \frac{\partial\delta(z - z_i)}{\partial z}\frac{\mathrm{d} z_i}{\mathrm{d}t} \\\\ 
  &= - \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i), \tag{6}
\end{align*}
$$

where

$$
\begin{equation*}
 \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} = \hat{x}\frac{\mathrm{d}x_i}{\mathrm{d}t} + \hat{y}\frac{\mathrm{d}y_i}{\mathrm{d}t} + \hat{z}\frac{\mathrm{d}z_i}{\mathrm{d}t}
 \tag{7}
\end{equation*}
$$

and 

$$
\begin{equation*}
\frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) 
  = \left(\hat{x}\frac{\partial}{\partial x} + \hat{y}\frac{\partial}{\partial y} + \hat{x}\frac{\partial}{\partial z}\right)
  \left[\delta(x - x_i) \\, \delta(y - y_i) \\, \delta(z - z_i) \right]. \tag{8}
\end{equation*}
$$

---

Next, we'll do something else...