# hugo-alt-text

A Hugo module that provides a custom shortcode for displaying images with clickable alt text descriptions.
When users click the "ALT" button overlay, a detailed media description pops up at the bottom of the
viewport.

## Installation

1. Initialize your Hugo site as a module (if not already done):

```bash
hugo mod init github.com/yourusername/yoursite
```

2. Install the module

```bash
hugo mod get -u -v github.com/j4ckofalltrades/hugo-alt-text
```

3. Add the module to your site's `config.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/j4ckofalltrades/hugo-alt-text"
```

## Usage

Use the `alt-text` shortcode in your markdown content:

```markdown
{{< alt-text src="/images/example.jpg" description="Media description that appears when users click the ALT button" >}}
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `src` | Yes | Path to the image file (relative to your static folder or absolute URL) |
| `description` | Yes | Detailed media description used as the image's alt text |
