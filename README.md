# jQuery scrollBottom

A plugin that triggers an event when the user reaches the bottom of the pag

## How to use

```javascript
$(function() {
    $(window).on('scrollBottom', { offsetY: -100 }, function() {
        console.log('scroll Bottom');
    });
});
```