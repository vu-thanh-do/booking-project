-- phân tích luồng chạy dự án booking 

-- bảng user : lưu thông tin cá nhân của user
-- bảng room : lưu thông tin của phòng ( giá ....) 
-- bảng order : lưu lịch sử , trạng thái , thông tin đặt phòng của user 
-- bảng dateOrder : lưu thông tin lịch đặt phòng của user để biết phòng còn trống giờ ngày nào 


-- luồng chính 

	user đăng kí -> xem phòng -> chọn phòng -> đặt phòng -> thanh toán -> bình luận ->  xem lịch sử phòng đã đặt
	admin -> tạo phòng -> xem thống kê từng phòng -> xem tất cả