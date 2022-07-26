---
title: "Data Fetching in React: Parent-Agnostic vs Parent-Aware Children"
abstract: "Null checking is central to writing code with React, but who should have to do it: the child, or the parent? In this article, we discuss two different approaches by examining the Parent-agnostic child, who trusts nothing and no one, and the Parent-aware child, who perhaps relies on others a bit too much."
publishedOn: TODO
imagePath: null
---

# Data Fetching in React: Parent-Agnostic vs Parent-Aware Children

Data fetching in React is a popular topic of blog posts, dev talks, and tutorials – and for good reason. Asynchronous data fetching introduces a whole collection of complexities to handle. I hope to contribute with a less-often discussed topic: the role of the children whose parent fetches data asynchronously, and to what extent the children should account for this behavior.

## Preamble: basic inline null checking

Take the following snippet:

```tsx
interface Data {
  price: number;
}

function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data: Data = await getData();
        setData(data);
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  return null;
}
```

Now consider a case where the `Parent` wants to render markup based on the data fetched with `getData`.

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  return <>{data.number}</>;
}
```

Because a `useEffect` runs _after_ the render, there's at least one render (i.e. the first) where `data` is still its initial value, `null`. This means, one way or another, we have to account for a `null` instance of `data` – otherwise, React will crash when we try to access `(null).number`.

<div data-daisy="alert">

I'd highly recommend checking out Dan Abramov's [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) if the mechanics of `useEffect` aren't so clear to you.

</div>

One popular option is to perform inline null checking.

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  return <>{data?.price}</>;
}
```

With optional chaining in place, when `data` is `null`, accessing `data?.price` will return `undefined` instead of throwing an error. This pattern takes advantage of the fact that, if an expression passed to a `{}` in React "resolves" to `null` or `undefined`, React will gracefully (i.e. without throwing an error) render nothing.

## A more complicated case

Optional chaining works fine for simple cases like above, but what about when we want to perform actions on the data that depend on its type? Consider if we'd like to format the `price` field to two decimal places:

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  return <>{data?.price.toFixed(2)}</>;
}
```

Since `data` will be null on the first render, `data?.price` will resolve to `undefined`, and we'll end up calling `(undefined).toFixed(2)`, which'll throw.

Simple enough, let's add a fallback value of `0`:

```tsx
return <>{(data?.price ?? 0).toFixed(2)}</>;
```

Alternatively, we could return early and avoid our optional chaining altogether:

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  if (data === null) return;

  return <>{data.price.toFixed(2)}</>;
}
```

Either solution works great when we're dealing with a single component, but once we introduce children into the mix, we encounter some deeper questions. Consider our original example, but with a new `FormatNumber` child.

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  return <FormatNumber num={data?.price} />;
}

function FormatNumber({ num }: { num: number }) {
  return <>{num.toFixed(2)}</>;
}
```

As explained above, this code will crash on the first render when `data?.price` resolves to `undefined`, and we pass `undefined` as `num` to `FormatNumber`.

There are three possible fixes, two of which we already discussed:

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  // option 1 (old: return early)
  if (data === null) return;
  return <FormatNumber num={data.price} />;

  // option 2 (old: inline null checking with a fallback value)
  return <FormatNumber num={data?.price ?? 0} />;
}

function FormatNumber({ num }: { num: number }) {
  // option 3 (new: null checking in the child)
  if (typeof num !== "number") return;
  return <>{num.toFixed(2)}</>;
}
```

Now that we're dealing with two components, we have the option to null check in the parent _or_ in the child – option 1 and option 2 null check in parent, and option 3 null checks in the child. This leads us to a deeper, more interesting question on best-practices:

**Who should be responsible for null checking?** The parent, or the child? This question is at the crux of this article; let's explore both approaches.

## Parent-aware children

A Parent-aware child relies on it's parent to do it's null checking for them. It has no null checking of it's own, and it expects it's props to always be populated and of the correct type. Otherwise, it may throw.

In our example above, this would mean the `Parent` should return early, ensuring that when `FormatNumber` _is_ rendered, its `num` prop is always populated and a `number`.
Alternatively, the `Parent` could perform inline null checking with a fallback value and achieve the same result.

It's worth nothing that if the child's prop is a more complicated data structure, such as a series of nested objects, passing a fallback value like `?? 0` isn't always an option.

## Parent-agnostic children

In contrast to a Parent-aware child, a Parent-agnostic child expects no null checking from it's parent. Maybe the parent will null check before rendering the child, maybe it won't - the Parent-agnostic child won't rely on either behavior. Instead, the Parent-agnostic child will perform it's own null checking, gracefully handling every case on its own.

In our example above, `FormatNumber` would have its own null checking, maybe something like:

```tsx
function FormatNumber({ num: number }) {
  if (typeof num !== "number") return;
  return <>{num.toFixed(2)}</>;
}
```

<div data-daisy="alert">

**Note**: when null checking a number or string, a simple `if (!prop)` check is mostly likely _not_ what you want – it will return `false` with `0` or `""`!

</div>

## So which is best?

I would argue that, in an ideal world, we would all write Parent-aware children. The child shouldn't have to worry about being passed nullish (`null` or `undefined`) values: it clearly defines that it expects non-nullish props in its type! If you're consuming an api (i.e. a child component) in your parent, it should be _your_ responsibility to call that child with the props it expects.

Unfortunately, this approach isn't always feasible. In the same way we're taught to never trust, and always validate, user input, the author of a child component should never expect that the parent will call it correctly. Anything else would be much too optimistic.

But what if there was a way for the child to guarantee that the parent would pass it the correct props, without needing any extra code to verify the fact? It seems to good to be true, but that's exactly what [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) do.

## strict null checks

In the words of the TypeScript docs:

> When `strictNullChecks` is `true`, `null` and `undefined` have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

With `strictNullChecks` enabled, let's go back to our example and try to perform inline null checking in the parent:

```tsx
function Parent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // ...
  }, []);

  /*
   Compile time ts error:
   Type 'number | undefined' is not assignable to type 'number'.
      Type 'undefined' is not assignable to type 'number'.
  */
  return <FormatNumber num={data?.id} />;
}

// Parent-aware variation (without it's own null checks)
function FormatNumber({ num: number }) {
  return <>{num.toFixed(2)}</>;
}
```

TypeScript now gives us a compile time error that `data?.id` may be `undefined`, and `FormatNumber`'s `num` prop can only be a `number`!

To fix this error, we can either return early, or modify our inline null checking to use a fallback value.

It's important to note that, from the perspective of the parent, little has changed: you still have to return early or perform inline null checking. TypeScript won't save you any code, or advise you to choose one over the other. All of that's true.

But from the perspective of the child, this makes a _huge_ difference. With `strictNullChecks` enabled, the child can have the clean code of a Parent-aware child (i.e. without any null checks of its own) with the safety guarantees of a Parent-agnostic child – if a parent tries to pass the child a prop not explicitly described in the child's type (like a nullish prop), TypeScript will throw an error!

## When strict null checks aren't available

`strictNullChecks` are a great solution when your codebase in written in TypeScript, but for when you're working in JavaScript, or for one reason or another you have to keep `strictNullChecks` disabled, there are a few considerations I try to keep in mind when deciding between writing Parent-aware and Parent-agnostic children.

Is the child a general-purpose component designed to be used by multiple parents, or a one-off written for a single case? If the former, I tend to air on the side of writing Parent-agnostic children – as we discussed above, it's best not to rely on a consumer of your component null checking for you (whether that be yourself or someone else working on the codebase).

On the other hand, if the child is only used by a single parent, that may be a better case for writing a Parent-aware child. The mental effort of remembering to pass non-nullish values to the child (either by returning early, or passing a fallback value when performing inline null checking), may be worth the code saved by making the child Parent-aware.

It's not ideal, but for situations where we have to rely on best practices instead of compile-time checks, all you can do is use your best judgement.
