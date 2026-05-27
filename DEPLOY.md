# Hướng dẫn Vận hành và Truy cập Hệ thống (Deployment Guide)

Tài liệu này hướng dẫn cách truy cập quản trị Server EC2 một cách an toàn và quy trình khởi chạy dự án.

## 1. Quy định Bảo mật SSH (Dành cho thành viên mới)

Để bảo vệ server khỏi các cuộc tấn công Brute-force, cổng SSH (Port 22) đã được khóa phân quyền theo IP (White-list). Thành viên mới muốn truy cập phải tuân thủ quy trình sau:

### Bước 1: Cấu hình IP trên AWS Security Group
1. Đăng nhập vào AWS Console và tìm đến Security Group của dự án.
2. Thêm một bản ghi **Inbound Rule** mới:
   - **Type:** SSH
   - **Port:** 22
   - **Source:** Chọn `My IP` (Tuyệt đối KHÔNG chọn `0.0.0.0/0`).
3. Lưu cấu hình. Khi IP mạng cá nhân thay đổi (ví dụ: đổi vị trí làm việc), phải cập nhật lại cấu hình này.

### Bước 2: Chia sẻ Khóa bí mật (`.pem` file)
- **QUY TẮC TỐI CAO:** Tuyệt đối **KHÔNG** gửi file `training-key.pem` qua các kênh chat công khai như Slack, Zalo, Messenger hoặc đính kèm qua Email thông thường.
- **Cách chia sẻ chuẩn:** Sử dụng các trình quản lý mật khẩu bảo mật mã hóa đầu cuối (như Bitwarden Send, 1Password) hoặc bàn giao trực tiếp qua USB tại local.

---

## 2. Lệnh Kiểm tra và Giám sát Server nhanh

Khi đã được cấp quyền, có thể chạy nhanh các lệnh giám sát từ máy cá nhân (Local) mà không cần giữ phiên SSH:

```bash
# Xem trạng thái các container (App, DB, Redis, Nginx) đang chạy
ssh -i training-key.pem ubuntu@3.218.249.62 "docker compose -f /home/ubuntu/app/compose.yaml ps"

# Kiểm tra dung lượng RAM còn trống trên EC2
ssh -i training-key.pem ubuntu@3.218.249.62 "free -h"
