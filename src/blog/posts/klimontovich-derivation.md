---
title: The Klimontovich Equation
subtitle: The first in a series of posts on the kinetic theory of plasmas (also a means for me to get to grips with $\KaTeX$).
layout: blog-post.njk
date: 2023-05-26
keywords: kinetic theory, plasma physics
supplement: false
tags: posts
---
This is the first of a series of posts in which I'll outline (my understanding of) the essential elements of the kinetic theory of plasmas. My aim with this series is to start with the fully kinetic picture (the topic of this post), then introduce the concept of an ensemble average and a distribution function, derive the Vlasov and Fokker-Planck equations, discuss collision operators, and then slowly make my way toward gyrokinetic theory and plasma turbulence (my research focus). These notes are primarily for my own benefit, but I've chosen to upload them here in the hopes that they might assist fellow bewildered PhD students who happen to stumble upon them.

With that said, I think a good place to start is the Klimontovich picture of kinetic theory \cite{klimontovich2013statistical, liboff2003kinetic}. In a nutshell, this is just a fancy way of writing down the $N$-body problem. However, as we'll see, the structure of the Klimontovich equation is very similar to the much more useful Vlasov equation, even though they describe the evolution of two quite different things. In this picture, the Klimontovich _phase space density_ $\mathcal{N}$ for a system comprised of $N$ particles of a particular species is given by

$$
\begin{equation}
  \mathcal{N}(\mathbf{x}, \mathbf{v}, t) = \sum_{i=1}^N \delta\left(\mathbf{x} - \mathbf{x}_i(t)\right) \delta\left(\mathbf{v} - \mathbf{v}_i(t)\right),
\end{equation}
$$

where $\mathbf{x}_i(t)$ and $\mathbf{v}_i(t)$ are the time-varying position and velocity of the $i$-th particle respectively. The normalisation of $\mathcal{N}$ is given by

$$
\begin{equation}
\int \mathcal{N}(\mathbf{x}, \mathbf{v}) \\, \mathrm{d}^3\mathbf{x}\\,\mathrm{d}^3\mathbf{v} = 
  \sum_{i=1}^N\int \delta(\mathbf{x} - \mathbf{x}_i) \\, \delta(\mathbf{v} - \mathbf{v}_i) \\, \mathrm{d}^3\mathbf{x}\\,\mathrm{d}^3\mathbf{v} = N.
\end{equation}
$$

[add picture of 1D phase space]

The aim here is to obtain an equation that describes the time evolution of $\mathcal{N}$, so we'll take the time derivative of Equation $1$.

$$
\begin{equation}
\frac{\partial \mathcal{N}}{\partial t} = \frac{\partial}{\partial t} \left[ \sum_i \delta(\mathbf{x} - \mathbf{x}_i) \\, \delta(\mathbf{v} - \mathbf{v}_i) \right]
\end{equation}
$$

Next, we'll take the derivative inside the sum and apply the product rule to give

$$
\begin{equation}
  \frac{\partial N}{\partial t} = \sum_i 
  \left[ 
    \delta(\mathbf{v} - \mathbf{v}_i)\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i) 
    + 
    \delta(\mathbf{x} - \mathbf{x}_i)\frac{\partial}{\partial t}\\,\delta(\mathbf{v} - \mathbf{v}_i)
  \right].
\end{equation}
$$

We can then use the chain rule to express the time derivatives of the delta-functions as

$$
\begin{align}
\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i) &= - \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
\frac{\partial}{\partial t}\\,\delta(\mathbf{v} - \mathbf{v}_i) &= - \frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i).
\end{align}
$$

For a proof of these relations, see the Appendix at the end of this post. This now allows Equation $4$ to be written as

$$
\begin{equation}
  \frac{\partial\mathcal{N}}{\partial t} = -\sum_i 
  \left[ 
    \delta(\mathbf{v} - \mathbf{v}_i)\frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i)
    + 
    \delta(\mathbf{x} - \mathbf{x}_i)\frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i) 
  \right].
\end{equation}
$$

At this point it is instructive to identify $\mathrm{d}\mathbf{x}_i/\mathrm{d}t \equiv \mathbf{v}_i$ and $\mathrm{d}\mathbf{v}_i/\mathrm{d}t$ as the velocity and acceleration of the $i$-th particle respectively. The latter is given by the Lorentz force law, 

$$
\begin{equation}
\frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} = \frac{q_i}{m_i}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right]
\end{equation}
$$

where $\mathbf{E}(\mathbf{x}_i, t)$ and $\mathbf{B}(\mathbf{x}_i, t)$ are, respectively, the electric and magnetic fields at the $i$-th particle's position $\mathbf{x}_i$ at time $t$. Substituting Equation $8$ into $7$ then gives

$$
\begin{aligned}
  \frac{\partial\mathcal{N}}{\partial t} = -\sum_i 
\bigg[
  & \delta (\mathbf{v} - \mathbf{v}_i)\mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
  & + \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i)
  \bigg] \tag{9}
\end{aligned}
$$

We'll now use the following delta-function identity

$$
\begin{equation*}
 f(a) \\, \delta(a-b) = f(b) \\, \delta(a-b), \tag{10}
\end{equation*}
$$

which is simply a consequence of the sifting property of the delta-function, to re-write the delta-functions in Equation $9$ as

$$
\begin{align*}
  \mathbf{v}_i \\, \delta(\mathbf{v} - \mathbf{v}_i) &= \mathbf{v} \\, \delta(\mathbf{v} - \mathbf{v}_i) \\\\
  \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right] &= \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}, t)
\right]. \tag{11}
\end{align*}
$$

Note that $\mathbf{E}$ and $\mathbf{B}$ are now written as functions of $\mathbf{x}$ instead of $\mathbf{x_i}$. We also note that the $\mathbf{v}_i$ in the cross product in Equation $9$ can be taken inside the $\partial/\partial\mathbf{v}$ deriviative, allowing identity $10$ to be applied once again to give

$$
\begin{aligned}
  \frac{\partial\mathcal{N}}{\partial t} = -\sum_i 
\bigg[
  & \delta (\mathbf{v} - \mathbf{v}_i)\mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
  & + \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i)
  \bigg]. \tag{12}
\end{aligned}
$$

Now we'll take the $\delta(\mathbf{v}-\mathbf{v}_i)$ inside the $\partial/\partial\mathbf{x}$ deriviative as it does not depend on $\mathbf{x}$, and likewise for the $\delta(\mathbf{x}-\mathbf{x}_i)$, to give

$$
\begin{aligned}
  \frac{\partial\mathcal{N}}{\partial t} = -\sum_i 
\bigg[
  & \mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \left[\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right] \\\\
  & + \frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \left[\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right]
  \bigg]. \tag{13}
\end{aligned}
$$

Shifting the sum then gives

$$
\begin{aligned}
  \frac{\partial\mathcal{N}}{\partial t} = -
  & \mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \left[\sum_i\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right] \\\\
  & - \frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \left[\sum_i\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right],
 \tag{14}
\end{aligned}
$$

and lastly, we identify the terms in the large square brackets as the phase density $\mathcal{N}$. If we then rearrange so that all of the terms are on one side, we arrive at the Klimontovich equation:

$$
\begin{equation}
  \frac{\partial\mathcal{N}}{\partial t} + \mathbf{v} \cdot \frac{\partial\mathcal{N}}{\partial\mathbf{x}} + \frac{q}{m}\left(\mathbf{E} + \mathbf{v}\times\mathbf{B}\right) \cdot \frac{\partial\mathcal{N}}{\partial\mathbf{v}} = 0.
 \tag{15}
\end{equation}
$$

### To-do:
- ~~Add a bibliography~~
- Okay, so what? What does each term mean?
- What is the advantage of writing down the $N$-body problem in this way? 
