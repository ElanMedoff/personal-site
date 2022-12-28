// https://www.skovy.dev/blog/nextjs-image-with-mdx-bundler
import imageSize from "image-size";
import path from "path";
import { Processor } from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";
import { promisify } from "util";
import { VFile } from "vfile";

const sizeOf = promisify(imageSize);

interface ImageNode extends Node {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith("/");
}

async function addMetadata(node: ImageNode): Promise<void> {
  const res = await sizeOf(
    path.join(process.cwd(), "public", node.properties.src)
  );

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  node.properties.width = res.width;
  node.properties.height = res.height;
}

export default function imageMetadata(this: Processor) {
  return async function transformer(tree: Node, file: VFile): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}
