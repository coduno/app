/**
 * A basic n-ary tree with dictionaries/objects as inner nodes
 * and strings as leaves.
 *
 * As a quick explanatory example, consider the following tree
 * structure:
 *
 *   /x        is a folder.
 *   /y.txt    is a file with contents 'Hi!'.
 *   /x/a.txt  is a file with contents 'Ho!'.
 *   /x/b.txt  is a file with contents 'Hu!'.
 *
 * This would result in the following Tree:
 *
 * new Tree({'y.txt': 'Hi!', 'x': new Tree({'a.txt': 'Ho!', 'b.txt': 'Hu!'})})
 */
function Tree(root) {
	this.root = root;

	this.search = function(name) {
		name = name.toLowerCase();
		return this.traverse(function(node, path) {
			return (node.name.toLowerCase().indexOf(name) > 0) ? Tree.implode(path.push(node.name)) : undefined;
		}, this);
	};

	this.traverse = function(f, that, node, path) {
		if (!that) {
			that = this;
		}

		if (!node && !path) {
			node = this.root;
			path = [];
		} else if (!node || !path) {
			return undefined;
		}

		if (typeof(node) === 'string' || node instanceof String) {
			var result = f.call(that, node, path);
			return !!result ? [result] : [];
		}

		// NOTE(flowlo): This would be way prettier with Object.values()
		var results = [];
		for (var child in node) {
			results = results.concat(this.traverse(f, that, node[child], path.concat([child])));
		}
		return results;
	};

	this.get = function(path) {
		path = Tree.explode(path);

		// If the path is malformed, abort traversal.
		if (!path) {
			return undefined;
		}

		// There are no child nodes if the
		// node itself is a leaf node.
		if (Tree.isLeaf(root)) {
			return undefined;
		}

		// Iterate through child nodes by repeatedly
		// unwrapping dictionaries. If we end up at
		// an undefined entry, the loop breaks and
		// undefined is returned.
		var node = this.root;
		for (var i = 0; i < path.length && !!node; i++) {
			node = node[path[i]];
		}

		return node;
	};

	this.exists = function(path) {
		return !!this.get(path);
	};

	this.remove = function(path) {
		path = Tree.explode(path);

		if (!path) {
			return undefined;
		}

		// Extract the name of the child node we should create.
		var child = path.pop();

		var node = this.root;
		var i = 0;

		while (i < path.length && !!node) {
			node = node[path[i++]];
		}

		if (!node) {
			return undefined;
		}

		// TODO Clean up empty nodes
		// propagating up to the root node.

		return delete node[child];
	};

	this.add = function(path, value) {
		path = Tree.explode(path);

		if (!path) {
			return undefined;
		}

		var child = path.pop();
		var node = this.root;

		for (var i = 0; i < path.length; i++) {
			var next = node[path[i]];

			if (!next) {
				node[path[i]] = {};
			}

			node = node[path[i]];
		}

		if (node instanceof String) {
			return undefined;
		}

		// Do not overwrite.
		if (!!node[child]) {
			return undefined;
		}

		return (node[child] = value);
	};

	this.all = function() {
		return this.traverse(function(node, path) {
			return Tree.implode(path);
		});
	};
}

Tree.separator = '/';

Tree.names = {
	good: /[a-zA-Z0-9-_~\.]{1,255}/,
	bad: ['.', '..']
};

Tree.implode = function(path) {
	return Tree.separator + path.join(Tree.separator);
};

Tree.explode = function(path) {
	if (path instanceof Array) {
		return path;
	}

	if (path.substring(0, 1) !== Tree.separator) {
		return undefined;
	}

	var result = path.substring(1).split(Tree.separator);

	return !result.some(function(it) {
		return Tree.names.bad.indexOf(it) > 0 || !Tree.names.good.test(it);
	}, this) ? result : undefined;
};

Tree.isLeaf = function(value) {
	return typeof(value) === 'string' || value instanceof String;
};
